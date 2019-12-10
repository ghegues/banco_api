using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MeuGesto.Domain.Entities;
using MeuGesto.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.DTO;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]


    public class ContaCorrenteController : ControllerBase
    {
        IContaCorrente _repo;

        public ContaCorrenteController(IContaCorrente contaCorrente)
        {
            _repo = contaCorrente;
        }
        [HttpGet("getAllContasOfUser")]
        public async Task<IActionResult> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            var CCs = await _repo.GetAllContasByUserId(int.Parse(userId));
            return Ok(CCs);
        }
        [HttpPost]
        public async Task<IActionResult> Post(ContaCorrente cc)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.Name);
                if (int.Parse(userId) != cc.UserId)
                    return Unauthorized();
                if (await _repo.GetContaByAgenciaConta(cc.Agencia, cc.Conta) != null)
                    return BadRequest("Já existe uma conta nessa mesma agência!");

                _repo.Add(cc);
                if (await _repo.SaveChangeAsync())
                {
                    return Ok();
                }

            }
            catch(Exception e) {            }

            return BadRequest();
        }
        [HttpPost("Deposito")]
        public async Task<IActionResult> Post(DepositoDTO Deposito)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            ContaCorrente cc = await _repo.GetContaByAgenciaConta(Deposito.Agencia, Deposito.Conta);

            if (cc == null)
            {
                return BadRequest("Não existe a conta na agência inserida!");
            }
            if (cc.UserId != int.Parse(userId))
            {
                return Unauthorized();
            }
            if (Deposito.Deposito <= 0)
            {
                return BadRequest("O valor de depósito terá que ser maior que zero!");
            }

            cc.Saldo += Deposito.Deposito;
            _repo.Update(cc);
            if (await _repo.SaveChangeAsync())
            {
                return Ok("Novo saldo: R$" + cc.Saldo);
            }
            return BadRequest();
        }

        [HttpPost("Saque")]
        public async Task<IActionResult> Post(SaqueDTO Saque)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            ContaCorrente cc = await _repo.GetContaByAgenciaConta(Saque.Agencia, Saque.Conta);

            if (cc == null)
            {
                return BadRequest("Não existe a conta na agência inserida!");
            }
            if (cc.UserId != int.Parse(userId))
            {
                return Unauthorized();
            }
            if(cc.Saldo <= 0)
            {
                return Ok("Saldo negativo.");
            }
            if (Saque.Saque <= 0)
            {
                return BadRequest("O valor do saque terá que ser maior que zero!");
            }

            cc.Saldo -= Saque.Saque;
            _repo.Update(cc);
            if (await _repo.SaveChangeAsync())
            {
                return Ok("Novo saldo: R$" + cc.Saldo);
            }
            return BadRequest();
        }
        [HttpGet("Saldo")]
        public async Task<IActionResult> GetSaldo(ContaCorrenteDTO cc)
        {
            try { 
                var userId = User.FindFirstValue(ClaimTypes.Name);
                ContaCorrente c = await _repo.GetContaByAgenciaConta(cc.Agencia, cc.Conta);

                if (c == null)
                {
                    return BadRequest("Não existe a conta na agência inserida!");
                }
                if (c.UserId != int.Parse(userId))
                {
                    return Unauthorized();
                }
                return Ok(c.Saldo);
            }catch(Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost("Transferencia")]
        public async Task<IActionResult> Post(TransferenciaDTO transferencia)
        {
            var userId = User.FindFirstValue(ClaimTypes.Name);
            ContaCorrente cc_user = await _repo.GetContaByAgenciaConta(transferencia.Agencia_user, transferencia.Conta_user);
            ContaCorrente cc_trans = await _repo.GetContaByAgenciaConta(transferencia.Agencia_transferencia, transferencia.Conta_transferencia);

            if (cc_user == null)
            {
                return BadRequest("Não existe a conta na agência inserida!");
            }
            if (cc_trans == null)
            {
                return BadRequest("Não existe a conta na agência do beneficiário!");
            }
            if (cc_user.UserId != int.Parse(userId))
            {
                return Unauthorized();
            }

            if (cc_user.Saldo <= 0)
            {
                return Ok("Saldo negativo.");
            }
            if (transferencia.Valor <= 0)
            {
                return BadRequest("O valor da transferência terá que ser maior que zero!");
            }

            cc_user.Saldo -= transferencia.Valor;
            cc_trans.Saldo += transferencia.Valor;


            _repo.Update(cc_user);
            _repo.Update(cc_trans);

            if (await _repo.SaveChangeAsync())
            {
                return Ok("Novo saldo: R$" + cc_user.Saldo);
            }
            return BadRequest();
        }
    }
}

