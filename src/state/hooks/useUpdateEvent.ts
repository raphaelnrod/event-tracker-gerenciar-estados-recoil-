import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { eventStateList } from "../atom";

const useUpdateEvent = () => {
    const setEventList = useSetRecoilState<IEvento[]>(eventStateList);
    return (event: IEvento) => {
        return setEventList((listaAntiga) => {
            const index = listaAntiga.findIndex((ev) => ev.id === event.id);
            return [...listaAntiga.slice(0, index), event, ...listaAntiga.slice(index + 1)];
        })
    }
}

export default useUpdateEvent;