function Logo({size = 40}) {
    return(
        <svg className="logo__icono" width={size} height={size} viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="pearlGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FFFFFF"/>
                    <stop offset="50%" stopColor="#D63384"/>
                    <stop offset="100%" stopColor="#4A148C"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#pearlGrad)" stroke="#FFC107" strokeWidth="3"/>
            <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6"/>
        </svg>
    );
}

export default Logo;