import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import RegisterForm from "@/component/signup/SignupForm";
import {LandingDiv, StyledContainer, StyledH1, StyledP} from "@/Styles/GeneralStyles";
import React from "react";

export default async function RegisterPage() {
    const session = await getServerSession();
    // if the user is already logged in, redirect to the home page
    if (session) {
            redirect('/profile');
    }

    return (
        <>
            <LandingDiv>
                <StyledContainer>
                    <StyledH1>Register</StyledH1>
                    <StyledP>To view your results, please sign up or login</StyledP>
                    <RegisterForm/>
                </StyledContainer>
            </LandingDiv>
        </>


    )

}


