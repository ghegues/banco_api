using System;
using System.Collections.Generic;
using System.Text;
using WebApi.Entities;

namespace MeuGesto.Domain.Entities
{
    public class ContaCorrente
    {       
        public int Id { get; set; }
        public int Agencia { get; set; }
        public int Conta { get; set; }
        public double Saldo { get; set; }
        public int UserId { get; set; }
        public virtual User userNavigation { get; set; }
    }

}
