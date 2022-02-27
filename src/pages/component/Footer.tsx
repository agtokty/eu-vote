import React from 'react';

import '../../style/Footer.css';

function Footer() {
    return (
        <div className="Footer">
            <div className="p-1 pt-2">
                <footer className="text-center text-black" >
                    <div className="">
                        <div className="">
                            <p className="flex justify-center items-center">
                                <span className="mr-4">About</span>
                                <span className="mr-4">Cookies</span>
                                <span className="mr-4">Privacy</span>
                                <span className="mr-4">Legal</span>
                            </p>
                        </div>
                    </div>

                    <div className="text-sm text-center p-4" >
                        © 2022 Copyright:
                        <a href='https://github.com/agtokty/eu-vote' target="_blank" rel="noreferrer"
                            className="text-black">eu-vote project
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Footer;