using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Videos.Models.ViewModel
{
    [DataContract]
    public class LineItemViewModel
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember, StringLength(50)]
        public string Description { get; set; }
        [DataMember]
        public ColorViewModel Color { get; set; }
        [DataMember]
        public SizeViewModel Size { get; set; }
    }
}