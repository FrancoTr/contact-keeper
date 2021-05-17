import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Alerts = () => {
    const alertContext = useContext(AlertContext)
    return (    //Depending which kind of alert is triggered, a different kind of message and alert will be shown
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
            </div>
        ))
    )
}

export default Alerts