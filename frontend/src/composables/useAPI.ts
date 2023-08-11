import { ref } from "vue"
import axios from "axios"

export async function useQuery(url: string) {
    const urlData = new URL(url)
    let data: any = {}
    let dataName = ref<string>(urlData.pathname.split('/')[1])

    data[dataName.value] = (await axios.get(url)).data
    
    return {
        data
    }
}


export async function useMutation(url: string, type: string, payload: any) {
    const urlData = new URL(url)
    let data: any = {}
    let dataName = ref<string>(urlData.pathname.split('/')[1])

    if (type == 'post') {
        data[dataName.value] = await axios.post(url, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    if (type == 'patch') {
        data[dataName.value] = await axios.patch(url, payload, {
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    if (type == 'delete') {
        data[dataName.value] = await axios.delete(url)
    }

    return {
        data
    }
}