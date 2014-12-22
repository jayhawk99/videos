
using System.ComponentModel.DataAnnotations;
using Videos.Repository.Interface;
namespace Videos.Models
{
    public class Video : IEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Length { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
