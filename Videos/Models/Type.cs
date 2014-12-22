
using Videos.Repository.Interface;
namespace Videos.Models
{
    public class Type : IEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
    }
}