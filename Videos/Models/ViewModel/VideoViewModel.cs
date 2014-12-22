using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
namespace Videos.Models.ViewModel
{
    [DataContract]
    public class VideoViewModel
    {        
        [DataMember]
        public int Id { get; set; }
        [DataMember, StringLength(100)]
        public string Title { get; set; }
        [DataMember]
        public int Length { get; set; }
        [DataMember]
        public CategoryViewModel Category { get; set; }
    }
}
