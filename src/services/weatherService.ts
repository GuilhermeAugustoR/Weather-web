import api from "./api";

interface IProps {
  location: string;
}
class WeatherService {
  async getWeather({ location }: IProps) {
    try {
      const response = await api.get(
        `data/2.5/weather?q=${location}&units=metric&lang=pt_br&appid=ca1a65477ac78c54379bf314895fff93`
      );
      return response.data;
    } catch (error: any) {
      console.log("errorMyKeys", error.response.data);
      return false;
    }
  }
}
export default new WeatherService();
