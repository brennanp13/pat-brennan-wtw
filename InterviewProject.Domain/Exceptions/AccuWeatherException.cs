using System;
using System.Collections.Generic;
using System.Text;

namespace InterviewProject.Domain.Exceptions
{
  public class AccuWeatherException : Exception
  {
    public AccuWeatherException()
    {
    }

    public AccuWeatherException(string message) : base(message)
    {
    }
  }
}
