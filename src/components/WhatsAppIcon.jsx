const WhatsAppIcon = ({ size = 24, style, ...props }) => {
    return (
        <img
            src="/whatsapp.png"
            alt="WhatsApp"
            style={{
                width: size,
                height: size,
                objectFit: 'contain',
                ...style
            }}
            {...props}
        />
    );
};

export default WhatsAppIcon;
