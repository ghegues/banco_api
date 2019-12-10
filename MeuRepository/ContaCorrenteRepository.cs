using MeuGesto.Domain;
using MeuGesto.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeuGesto.Repository
{
    public interface IContaCorrente
    {
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangeAsync();
        Task<ContaCorrente[]> GetAllContasByUserId(int UserId);
        Task<ContaCorrente> GetContaByAgenciaConta(int agencia, int conta);
    }

    public class ContaCorrenteRepository : IContaCorrente
    {
        private readonly Context _context;
        public ContaCorrenteRepository(Context context)
        {
            this._context = context;
            this._context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangeAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        public async Task<ContaCorrente[]> GetAllContasByUserId(int UserId) => await _context.ContasCorrente.Where(x => x.UserId == UserId).ToArrayAsync();
        public async Task<ContaCorrente> GetContaByAgenciaConta(int agencia, int conta) => await _context.ContasCorrente.FirstOrDefaultAsync(x => x.Agencia == agencia && x.Conta == conta);

        //public async Task<int> Deposito(ContaCorrente cc,)
        //{
        //    return NotImplementedException;
        //}       

    }    
}
