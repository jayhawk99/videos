using System.Data.Entity.ModelConfiguration;

namespace Videos.Models.Mapping
{
    public class SizeMap : EntityTypeConfiguration<Size>
    {
        public SizeMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("Sizes");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.Name).HasColumnName("Name");
        }
    }
}
