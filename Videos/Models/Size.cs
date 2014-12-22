using System.Collections.Generic;
using Videos.Repository.Interface;

namespace Videos.Models
{
    public class Size : IEntity
    {
        public Size()
        {
            this.LineItems = new List<LineItem>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<LineItem> LineItems { get; set; }
    }
}
