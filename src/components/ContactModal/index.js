import React from "react";
import "../../styles/ContactModal.css";

const ContactModal = ({ show, onClose, email }) => {
    if (!show) return null;

    const copyEmail = async () => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = email;
                textarea.style.position = "fixed";
                textarea.style.left = "-9999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            alert("Email copiado!");
        } catch (err) {
            alert("Não foi possível copiar automaticamente. Copie manualmente: " + email);
        }
    };

    return (
        <div className="contact-modal-overlay" onClick={onClose}>
            <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
                <button className="contact-modal-close" onClick={onClose} aria-label="Close">
                    ×
                </button>

                <h3 className="contact-modal-title">Contact</h3>
                <p className="contact-modal-subtitle">Send us an email:</p>

                <div className="contact-modal-email-row">
                    <input
                        className="contact-modal-email"
                        value={email}
                        readOnly
                        onFocus={(e) => e.target.select()}
                    />
                    <button className="contact-modal-copy" onClick={copyEmail} type="button">
                        Copy
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ContactModal;
