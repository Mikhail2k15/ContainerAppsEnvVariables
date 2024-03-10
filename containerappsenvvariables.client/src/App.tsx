import { useEffect, useState } from 'react';
import './App.css';
interface ContainerInfo {
    replicaName: string;
    revisionName: string;
    envs: { [key: string]: string };
}

function App() {    
    const [containerInfoData, setContainerInfoData] = useState<ContainerInfo>();

    useEffect(() => {
        populateContainerInfoData();
    }, []);

    const containerInfo = containerInfoData === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        :
        <>
            <p>Replica Name: {containerInfoData.replicaName}, Revision Name: {containerInfoData.revisionName}</p>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(containerInfoData.envs).map(([key, value]) =>
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
        ;
    return (
        <div>
            <h1 id="tabelLabel">Container App Environment Variables</h1>
            {containerInfo}
        </div>
    );
    
    async function populateContainerInfoData() {
        const response = await fetch('containerinfo');
        const data = await response.json();
        setContainerInfoData(data);
    }
}

export default App;