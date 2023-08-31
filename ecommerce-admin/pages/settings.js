import Layout from "@/components/Layout";
import Spinners from "@/components/Spinners";
import axios from "axios";
import { useState, useEffect } from "react";
import { withSwal } from "react-sweetalert2";


function SettingsPage({ swal }) {
    /************ application states ************/
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [featuredProductsId, setFeaturedProductsId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isFeaturedLoading, setIsFeaturedLoading] = useState(false)
    /** fetch products on mount */
    useEffect(() => {
        setIsLoading(true)
        axios.get('/api/products').then((res) => {
            setFeaturedProducts(res.data)
            setIsLoading(false)
        })

        setIsFeaturedLoading(true)
        axios.get('/api/settings?name=featuredProductsId')
            .then((res) => {
                setFeaturedProductsId(res.data.value)
                setIsFeaturedLoading(false)
            })
    }, [])

    /** functionality to save the given settings */
    const saveSettings = async () => {
        await axios.put('/api/settings', {
            name: 'featuredProductsId',
            value: featuredProductsId,
        }).then((result) => {
            if (result.status === 200) {
                // show success message
                swal.fire({
                    title: "Settings successfully saved",
                    icon: 'success'
                })
            }
        }).catch((err) => {
            swal.fire({
                title: "Unable to save settings",
                text: err.response.message,
                icon: 'error'
            })
        })
    }
    return (
        <Layout>
            <h2>Settings</h2>
            {/* spinner */}
            {
                (isLoading || isFeaturedLoading) && <Spinners fullWidth={true} />
            }
            {/* map through all the featured products array */}
            {
                (!isLoading || !isFeaturedLoading) && (
                    <>
                        <label>Featured products</label>
                        <select
                            value={featuredProductsId}
                            autoFocus
                            onChange={(e) => setFeaturedProductsId(e.target.value)}
                        >
                            {
                                featuredProducts.length > 0 && featuredProducts.map((p) => (
                                    <option key={p._id} value={p._id}>{p.title}</option>
                                ))
                            }
                        </select>
                        <div>
                            <button
                                onClick={saveSettings}
                                className="btn-primary"
                            >
                                Save settings
                            </button>
                        </div>
                    </>
                )
            }
        </Layout>
    )
}

/** sweet alert */
export default withSwal(({ swal }) => (
    <SettingsPage swal={swal} />
))

