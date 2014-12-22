
using Videos.Repository.Interface;
namespace Videos.Models
{
    public class LineItem : IEntity
    {
        public int Id { get; set; }
        public int ColorId { get; set; }
        public int SizeId { get; set; }
        public string Description { get; set; }
        public virtual Color Color { get; set; }
        public virtual Size Size { get; set; }
    }
}
