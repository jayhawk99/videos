using System.Data.Entity.ModelConfiguration;

namespace Videos.Models.Mapping
{
    public class LineItemMap : EntityTypeConfiguration<LineItem>
    {
        public LineItemMap()
        {
            // Primary Key
            this.HasKey(t => t.Id);

            // Properties
            this.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(50);

            // Table & Column Mappings
            this.ToTable("LineItems");
            this.Property(t => t.Id).HasColumnName("Id");
            this.Property(t => t.ColorId).HasColumnName("ColorId");
            this.Property(t => t.SizeId).HasColumnName("SizeId");
            this.Property(t => t.Description).HasColumnName("Description");

            // Relationships
            this.HasRequired(t => t.Color)
                .WithMany(t => t.LineItems)
                .HasForeignKey(d => d.ColorId);
            this.HasRequired(t => t.Size)
                .WithMany(t => t.LineItems)
                .HasForeignKey(d => d.SizeId);

        }
    }
}
