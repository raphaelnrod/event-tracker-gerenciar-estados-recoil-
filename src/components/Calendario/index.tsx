import React from "react";
import style from "./Calendario.module.scss";
import ptBR from "./localizacao/ptBR.json";
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from "kalend";
import "kalend/dist/styles/index.css";
import { useRecoilValue } from "recoil";
import { eventStateList } from "../../state/atom";
import useUpdateEvent from "../../state/hooks/useUpdateEvent";

interface IKalendEvento {
  id?: number;
  startAt: string;
  endAt: string;
  summary: string;
  color: string;
}

const Calendario: React.FC = () => {
  const eventosKalend = new Map<string, IKalendEvento[]>();
  const eventos = useRecoilValue(eventStateList);
  const updateEvent = useUpdateEvent();

  eventos.forEach((evento) => {
    const chave = evento.inicio.toISOString().slice(0, 10);
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, []);
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: "blue",
    });
  });

  const onEventDragFinish: OnEventDragFinish = (
    prevEvent: CalendarEvent,
    updatedEvent: CalendarEvent
  ) => {
    const evento = eventos.find(
      (event) => event.descricao === updatedEvent.summary
    );
    if (evento) {
      const updated = { ...evento };
      updated.inicio = new Date(updatedEvent.startAt);
      updated.fim = new Date(updatedEvent.endAt);

      updateEvent(updated);
    }
  };

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        onEventDragFinish={onEventDragFinish}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={"24"}
        weekDayStart={"Monday"}
        calendarIDsHidden={["work"]}
        language={"customLanguage"}
        customLanguage={ptBR}
      />
    </div>
  );
};

export default Calendario;
