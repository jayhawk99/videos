using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Videos.Models.ViewModel
{
    [DataContract]
    public class VinScoreViewModel
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int GlobalCustomerId { get; set; }
        [DataMember]
        public int Score { get; set; }
    }
}
