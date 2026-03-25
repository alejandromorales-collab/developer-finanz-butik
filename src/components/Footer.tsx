const footerLinks = {
  Inversiones: ["Cash", "Lend", "Buy", "Develop"],
  Compañía: ["Sobre nosotros", "Blog", "Carreras", "Prensa"],
  Legal: ["Términos de servicio", "Política de privacidad", "Divulgaciones"],
  Soporte: ["Centro de ayuda", "Contacto", "FAQ"],
};

const Footer = () => {
  return (
    <footer className="border-t bg-foreground py-10 text-white/60 sm:py-12">
      <div className="container px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">FB</span>
              </div>
              <span className="font-heading text-lg font-bold text-white">
                Finanz Butik<sup className="text-[10px] text-white/40">®</sup>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Plataforma de inversión inmobiliaria curada para inversionistas exigentes.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p className="mb-3 font-heading text-sm font-bold text-white">{title}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs sm:mt-10">
          © {new Date().getFullYear()} Finanz Butik. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
