import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderArea, LinkHeader } from './styled';

import { isLogged, doLogout } from 'helpers/AuthHandler';

import Logo from 'img/olx-logo.png';

const Header = () => {
	let logged = isLogged();

	return (
		<HeaderArea>
			<div className="container">
				<div className="logo">
					<Link to="/">
						<img src={Logo} alt="OLX"/>
					</Link>
				</div>
				<nav>
					<ul>
						{logged &&
							<>
								<li><LinkHeader to="/my-account">Minha Conta</LinkHeader></li>
								<li><LinkHeader onClick={doLogout}>Sair</LinkHeader></li>
								<li><LinkHeader to="/post-an-ad" className="button__ad">Poste um Anúncio</LinkHeader></li>
							</>
						}
						{!logged &&
							<>
								<li><LinkHeader to="/signin">Login</LinkHeader></li>
								<li><LinkHeader to="/signup">Cadastrar</LinkHeader></li>
								<li><LinkHeader to="/signin" className="button__ad">Poste um Anúncio</LinkHeader></li>
							</>
						}
					</ul>
				</nav>
			</div>
		</HeaderArea>
	);
}

export default Header;