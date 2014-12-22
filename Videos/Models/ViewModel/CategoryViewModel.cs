using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Videos.Models.ViewModel
{
    [DataContract]
    public class CategoryViewModel
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember, StringLength(50)]
        public string Description { get; set; }
    }
}