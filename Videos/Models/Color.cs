using System.Collections.Generic;
using Videos.Repository.Interface;

namespace Videos.Models
{
    public class Color : IEntity
    {
        public Color()
        {
            this.LineItems = new List<LineItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<LineItem> LineItems { get; set; }
    }
}
