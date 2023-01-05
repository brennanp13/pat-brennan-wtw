using InterviewProject.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InterviewProject.Domain.Services.WeatherService
{
  public class WeatherService : IWeatherService
  {
    public Task<IEnumerable<WeatherForecast>> GetWeatherForecast(string location)
    {
      throw new NotImplementedException();
    }
  }
}
