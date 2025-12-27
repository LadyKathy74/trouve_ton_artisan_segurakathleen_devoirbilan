import nodemailer from "nodemailer";
import Contact from "../models/contact.model.js";

export const sendContactEmail = async (req, res) => {
  try {
    const { nom, email, objet, message, artisanEmail } = req.body;

    // Validation basique
    if (!nom || !email || !objet || !message || !artisanEmail) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    // 1. Enregistrer dans la base
    await Contact.create({
      nom,
      email,
      objet,
      message,
      artisanEmail
    });

    // 2. Envoyer l'email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER, // L'expéditeur doit être le compte authentifié
      to: artisanEmail,
      replyTo: email, // Permet à l'artisan de répondre directement au client
      subject: `[Trouve ton Artisan] ${objet}`,
      text: `Bonjour,\n\nVous avez reçu un nouveau message de ${nom} (${email}) :\n\n${message}\n\n---\nCe message a été envoyé via la plateforme Trouve ton Artisan.`
    });

    res.json({ success: true, message: "Message enregistré et email envoyé" });

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ error: "Erreur lors de l'envoi du message" });
  }
};
