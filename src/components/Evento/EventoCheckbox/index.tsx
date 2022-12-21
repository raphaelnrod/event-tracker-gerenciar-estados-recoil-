import React from "react";
import { IEvento } from "../../../interfaces/IEvento";
import useUpdateEvent from "../../../state/hooks/useUpdateEvent";

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {
  const updateEvent = useUpdateEvent();

  const changeEventStatus = () => {
    const newEvent = { ...evento };
    newEvent.completo = !newEvent.completo;

    updateEvent(newEvent);
  };

  const estilos = [
    "far",
    "fa-2x",
    evento.completo ? "fa-check-square" : "fa-square",
  ];

  return <i className={estilos.join(" ")} onClick={changeEventStatus}></i>;
};

export default EventoCheckbox;
