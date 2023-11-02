import "@/styles/globals.css"
import "@/styles/auth.css"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import { SignupInput } from "@/types/inputs/signuput"
import api from "@/utils/axios"
import { useRouter } from "next/router"
import Error from "@/components/error";
import Chip from "./chip"
import Cookies from 'js-cookie';
import axios from "axios"

const Signup = () => {

    const [submitData, setSubmitData] = useState<Partial<SignupInput>>({});
    const [error, setError] = useState<string | undefined>()
    const [preferences, setPreferences] = useState<string[]>([])
    const [preferenceList, setPreferencelist] = useState<string[]>([])
    type SignupInputKeys = keyof typeof submitData;

    const router = useRouter();

    // update the submissions value
    const handleChange = (key: SignupInputKeys, value: string) => {
        setSubmitData({ ...submitData, [key]: value });
    };

    // add or remove preferences
    const togglePreference = (pref: string) => {
        if (preferences.includes(pref)) {
            setPreferences(preferences.filter((item) => item !== pref));
        } else {
            setPreferences([...preferences, pref]);
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log({ ...submitData, preferences })
        try {
            const res = await axios.post("/api/auth/signup", { ...submitData, preferences });
            console.log(res)
            if (res.status == 200 && res.data.message == "Signed up successfully") {
                console.log(res.data)
                Cookies.set('token', res.data.token)
                router.push("/");
            }
            else setError("Some Error Occured")
        } catch (e: any) {
            console.log(e)
            if (e.request.status == 409) {
                setError("User already exists, please signin in");
                setTimeout(() => router.push("/auth/signin"), 3000)
            }
            else setError("Some Error Occured")
        }
    }

    useEffect(() => {
        api.get("/preference-list").then((res) => setPreferencelist(res.data))
    }, [])
    return (
        <div className="auth-form">
            <h1>Signup</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input placeholder="Name" required onChange={(e) => handleChange("name", e.target.value)} />
                <input placeholder="Email" required onChange={(e) => handleChange("email", e.target.value)} />
                <input placeholder="Phone No." required onChange={(e) => handleChange("phone", e.target.value)} />
                <input placeholder="Password" required type="password" onChange={(e) => handleChange("password", e.target.value)} />
                <h4 style={{ color: "white" }}>Your Interests</h4>
                <div className="preferences">
                    {
                        preferenceList.map(pref =>
                            <Chip pref={pref} key={pref} togglePreference={togglePreference} />
                        )

                    }
                </div>
                <button type="submit" >Signup</button>
            </form>
            <Link href="/auth/signin/" style={{ color: "white" }} >Already have an account?</Link>
            {error && <Error message={error!} />}
        </div>
    )
}

export default Signup
