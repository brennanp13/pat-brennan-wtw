using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InterviewProject.Domain.Models;
using InterviewProject.Domain.Services.WeatherService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InterviewProject.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class WeatherForecastController : ControllerBase
  {
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IWeatherService _weatherService;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, IWeatherService weatherService)
    {
      _logger = logger;
      _weatherService = weatherService;
    }

    [HttpGet("GetByLocation")]
    public async Task<IEnumerable<WeatherForecast>> GetByLocation(string locationKey)
    {
      //var rng = new Random();
      //return Enumerable.Range(1, 5).Select(index => new WeatherForecast
      //{
      //  Date = DateTime.Now.AddDays(index),
      //  HighTemperature = rng.Next(40, 95),
      //  LowTemmperature = rng.Next(20, 40),
      //  DayIcon = convetIconDigits(rng.Next(1, 44))
      //})
      //.ToArray();

      return await _weatherService.GetFiveDayWeatherForecast(locationKey);
    }

    [HttpGet("GetByLocationByPostalCode")]
    public async Task<IEnumerable<WeatherLocation>> GetLocationByPostalCode(string postalCode)
    {

      // for mocking response
      //var locations = new List<WeatherLocation>()
      //{
      //  new WeatherLocation() {Name = "Philly", Key= "123", Rank = 1},
      //  new WeatherLocation() {Name = "New York", Key= "456", Rank = 2},
      //  new WeatherLocation() {Name = "San Fran", Key= "789", Rank = 3}
      //};

      //return locations;

      return await _weatherService.PostalCodeSearch(postalCode);
    }

    private string convetIconDigits(int dayIcon)
    {
      if (dayIcon < 10)
      {
        return "0" + dayIcon.ToString();
      }

      return dayIcon.ToString();
    }
  }
}
