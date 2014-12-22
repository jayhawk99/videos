using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Videos.Models.ViewModel
{
	[DataContract]
	public class UserPreferencesViewModel
	{
		[DataMember]
		public int Id { get; set; }
		[DataMember]
		public int UserId { get; set; }
		[DataMember]
		public int PreferenceId { get; set; }
		[DataMember, StringLength(100)]
		public string Value { get; set; }
	}
}