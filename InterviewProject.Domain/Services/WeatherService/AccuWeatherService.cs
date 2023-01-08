using InterviewProject.Domain.Exceptions;
using InterviewProject.Domain.Models;
using InterviewProject.Domain.Models.AccuWeatherModels;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace InterviewProject.Domain.Services.WeatherService
{
  public class AccuWeatherService : IWeatherService
  {
    private readonly WeatherAPISettings _weatherAPISettings;
    private readonly HttpClient _httpClient;
    private readonly ILogger<AccuWeatherService> _logger;

    public AccuWeatherService(IOptions<WeatherAPISettings> weatherAPISettings, HttpClient httpClient, ILogger<AccuWeatherService> logger)
    {
      _weatherAPISettings = weatherAPISettings.Value;
      _logger = logger;


      var clientHandler = new HttpClientHandler() { AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate };
      _httpClient = new HttpClient(clientHandler); // need to set in start up

      _httpClient.DefaultRequestHeaders.Add("Accept-Encoding", "gzip"); // best practice per weahter api documentation
    }

    public async Task<IEnumerable<WeatherForecast>> GetFiveDayWeatherForecast(string locationKey)
    {
      try
      {
        var url = BuildFiveDayForecaseURL(locationKey);
        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.IsSuccessStatusCode)
        {

          var content = await apiResponse.Content.ReadAsStringAsync();
          var forecast = JsonConvert.DeserializeObject<AccuWeatherForecast>(content);
          var result = forecast.DailyForecasts.Select((f) => new WeatherForecast() { Date = f.Date, HighTemperature = f.Temperature.Maximum.Value, LowTemmperature = f.Temperature.Minimum.Value, DayIcon = f.Day.Icon.ToString()  });

          return result;
        }
        else
        {
          _logger.LogError("Open Weather API response was unsuccessful", apiResponse);
          throw new AccuWeatherException("Open Weather API response was unsuccessful");
        }
      } catch(Exception ex)
      {
        _logger.LogError("There was an error trying to get 5 day forecast", ex);
        throw ex;
      }

    }

    public async Task<IEnumerable<WeatherLocation>> PostalCodeSearch(string postalCode)
    {
      try
      {
        var url = BuildPostalCodeSearchURL(postalCode);
        var apiResponse = await _httpClient.GetAsync(url);
        if (apiResponse.IsSuccessStatusCode)
        {

          var content = await apiResponse.Content.ReadAsStringAsync();
          var locations = JsonConvert.DeserializeObject<IEnumerable<AccuWeatherLocation>>(content);
          var result = locations.Select((location) => new WeatherLocation() { Key = location.Key, Name = location.EnglishName, Rank = location.Rank });

          return result;
        }
        else
        {
          _logger.LogError("Open Weather API response was unsuccessful", apiResponse);
          throw new AccuWeatherException("Open Weather API response was unsuccessful");
        }
      } catch (Exception ex)
      {
        _logger.LogError("There was an error trying to get location by postal code", ex);
        throw ex;
      }
    }

    private string BuildPostalCodeSearchURL(string postalCode)
    {
      if (string.IsNullOrEmpty(postalCode))
      {
        throw new ArgumentNullException(nameof(postalCode));
      }

      ChecksWeatherSettings();

      return $"{_weatherAPISettings.BaseURL}/locations/v1/postalcodes/search?apikey={_weatherAPISettings.APIKey}&q={postalCode}";

    }

    private string BuildFiveDayForecaseURL(string locationKey)
    {
      if (string.IsNullOrEmpty(locationKey))
      {
        throw new ArgumentNullException(nameof(locationKey));
      }

      ChecksWeatherSettings();

      return $"{_weatherAPISettings.BaseURL}/forecasts/v1/daily/5day/{locationKey}?apikey={_weatherAPISettings.APIKey}";

    }

    private void ChecksWeatherSettings()
    {
      if (string.IsNullOrEmpty(_weatherAPISettings.APIKey))
      {
        throw new ArgumentNullException(nameof(_weatherAPISettings.APIKey));
      }

      if (string.IsNullOrEmpty(_weatherAPISettings.BaseURL))
      {
        throw new ArgumentNullException(nameof(_weatherAPISettings.BaseURL));
      }
    }
  }
}
