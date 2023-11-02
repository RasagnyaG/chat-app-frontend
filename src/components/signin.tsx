import "@/styles/auth.css"
import Link from "next/link"
import { useState } from "react"
import { redirect } from "next/navigation"
import api from "@/utils/axios";
import Error from "@/components/error";
import { useRouter } from "next/router";
import Cookies from 'js-cookie';
import axios from "axios";
const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | undefined>()
    const router = useRouter()

    const handelSubmit = async (e: any) => {
        console.log("clicked")
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/signin", {
                email,
                password
            }, { headers: { 'Content-Type': 'application/json' } });

            if (res.status == 200) {
                Cookies.set('token', res.data.token)
                router.push("/")
            }
            console.log(res)
        } catch (e: any) {
            console.log(e)
            if (e.request.status == 404) {
                setError("User not Found, please Signup");
                setTimeout(() => router.push("/auth/signup"), 3000)
            }
            else if (e.request.status == 401) {
                setError("Invalid Password, try again");
            }
            else setError("Some Error Occured")
        }
    }
    return (
        <div className="auth-form">
            <h1>Signin</h1>
            <form onSubmit={(e) => handelSubmit(e)}>
                <input placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder="Password" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Signin</button>

            </form>
            <Link href="/auth/signup/" style={{ color: "white" }}> Don&apos;t have an account? </Link>
            {error && <Error message={error!} />}
        </div>
    )
}

export default Signin