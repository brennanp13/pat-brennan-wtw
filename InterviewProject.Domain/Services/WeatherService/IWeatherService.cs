using InterviewProject.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InterviewProject.Domain.Services.WeatherService
{
  public interface IWeatherService
  {
    Task<IEnumerable<WeatherForecast>> GetWeatherForecast(string location);
  }
}
