using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Videos.Models.ViewModel
{
	[DataContract]
	public class TypeViewModel
	{
		[DataMember]
		public int Id { get; set; }
		[DataMember, StringLength(50)]
		public string Description { get; set; }
	}
}