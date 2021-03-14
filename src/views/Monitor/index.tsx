import React, { useEffect, useState } from 'react';
import { getMonitoring } from '../../api/monitor';
import { Chart } from 'react-charts';
import { addMinutes } from 'date-fns';

const Monitor = () => {
  const [hostData, setHostData] = useState<any>([]);
  const [hostName, setHostName] = useState<any>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: hostData,
      },
    ],
    [hostData]
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  );

  const fetchData = async () => {
    const minusThirty = addMinutes(new Date(), -30);
    const data = await getMonitoring(
      minusThirty.toISOString(),
      new Date().toISOString()
    );

    if (data && data.length) {
      setHostName(data[0].name);
      const format = data.map(({ memory, created_at }) => {
        return [new Date(created_at), memory];
      });

      setHostData(format);
    }
  };

  return (
    <div
      style={{
        width: '800px',
        height: '300px',
        margin: '20px',
      }}
    >
      <h2>Últimos 30 minutos de monitorización del host {hostName}</h2>
      {hostData && !!hostData.length && <Chart data={data} axes={axes} />}
    </div>
  );
};

export default Monitor;
