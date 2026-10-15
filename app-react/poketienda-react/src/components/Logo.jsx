function Logo(){
    return(
        <svg class="logo__icono" width="40" height="40" viewBox="0 0 100 100" role="img" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="pearlGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#FFFFFF"/>
                    <stop offset="50%" stop-color="#D63384"/>
                    <stop offset="100%" stop-color="#4A148C"/>
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#pearlGrad)" stroke="#FFC107" stroke-width="3"/>
            <ellipse cx="35" cy="35" rx="10" ry="6" fill="#FFFFFF" opacity="0.6"/>
        </svg>
    );
}

export default Logo;