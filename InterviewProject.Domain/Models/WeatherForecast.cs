using System;

namespace InterviewProject.Domain.Models
{
  public class WeatherForecast
  {
    public DateTime Date { get; set; }
    public double HighTemperature { get; set; }
    public double LowTemmperature { get; set; }
    public string DayIcon { get; set; }
  }
}
