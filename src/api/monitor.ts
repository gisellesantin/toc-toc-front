import axios from 'axios';
import { HostDataInterface } from '../interfaces/host-data';

const getMonitoring = async (start: string, end: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3500/get/resource/memory?start=${start}&end=${end}`
    );

    return data as HostDataInterface[];
  } catch (e) {
    return null;
  }
};

export { getMonitoring };
