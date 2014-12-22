using System.Data.Entity;

namespace Videos.Models
{
    public class VideosContext : DbContext
    {
        static VideosContext()
        {
            Database.SetInitializer<VideosContext>(null);
        }

		public VideosContext()
			: base("Name=VideosContext")
		{
		}

        public DbSet<Category> Categories { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<LineItem> LineItems { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Video> Videos { get; set; }
        public DbSet<UserPreferences> UserPreferences { get; set; }
        public DbSet<Videos.Models.Type> Types { get; set; }
		public DbSet<VinScore> VinScores { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Configurations.Add(new CategoryMap());
            //modelBuilder.Configurations.Add(new ColorMap());
            //modelBuilder.Configurations.Add(new LineItemMap());
            //modelBuilder.Configurations.Add(new SizeMap());
            //modelBuilder.Configurations.Add(new VideoMap());
        }
    }
}
