import { useEffect } from 'react';
import '../assets/styles/Notification.css';

const Notification = ({ message, type = 'success', onClose }) => {
  console.log("Notification renderizada:", { message, type }); // ← para confirmar que se monta

  useEffect(() => {
    console.log("Notification montada, timer iniciado");
    const timer = setTimeout(() => {
      console.log("Notification cerrándose");
      onClose();
    }, 3000);

    return () => {
      console.log("Notification desmontada");
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div 
      className={`notification ${type} show`}  // forzamos 'show' directamente
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 999999,           // muy alto para que no quede detrás de nada
        minWidth: '300px',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        color: 'white',
        fontSize: '16px',
        fontWeight: '500',
        opacity: 1,               // forzamos visibilidad
        transform: 'translateY(0)', // forzamos animación completada
        background: type === 'success' ? 'linear-gradient(135deg, #28a745, #218838)' : 'linear-gradient(135deg, #dc3545, #c82333)',
      }}
    >
      <div className="notification-content" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {type === 'success' && <span style={{ fontSize: '24px' }}>✓</span>}
        {type === 'remove' && <span style={{ fontSize: '24px' }}>✕</span>}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;