using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Videos.Repository.Interface;

namespace Videos.Models
{
    public class VinScore : IEntity
    {
        public int Id { get; set; }
        public int GlobalCustomerID { get; set; }
        public int Score { get; set; }

    }
}


