
using Videos.Repository.Interface;
namespace Videos.Models
{
    public class UserPreferences : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PreferenceId { get; set; }
        public string Value { get; set; }
    }
}
