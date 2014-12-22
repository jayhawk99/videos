using System;
using System.Collections.Generic;
using Videos.Repository.Interface;

namespace Videos.Models
{
    public class Category : IEntity
    {
        public Category()
        {
            this.Videos = new List<Video>();
        }

        public int Id { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Video> Videos { get; set; }
    }
}
