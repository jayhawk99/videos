using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Videos.Models.ViewModel
{
    [DataContract]
    public class SizeViewModel
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember, StringLength(50)]
        public string Name { get; set; }
    }
}
