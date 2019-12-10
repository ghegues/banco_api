using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.DTO
{
    public class TransferenciaDTO
    {
        public int Agencia_user { get; set; }
        public int Conta_user { get; set; }
        public int Agencia_transferencia { get; set; }
        public int Conta_transferencia { get; set; }
        public double Valor { get; set; }
    }
}
