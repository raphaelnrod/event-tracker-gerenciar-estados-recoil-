import React from 'react';
import { useSetRecoilState } from 'recoil';
import { IEvento } from '../../../interfaces/IEvento';
import { eventStateList } from '../../../state/atom';

const EventoCheckbox: React.FC<{ evento: IEvento}> = ({evento}) => {

  const setEventList = useSetRecoilState<IEvento[]>(eventStateList);

  const changeEventStatus = () => {
    const newEvent = {...evento}
    newEvent.completo = !newEvent.completo;

    setEventList((listaAntiga) => {
      const index = listaAntiga.findIndex((ev) => ev.id === evento.id);
      return [...listaAntiga.slice(0, index), newEvent, ...listaAntiga.slice(index + 1)];
    })
  }
  
  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  return (<i className={estilos.join(' ')} onClick={changeEventStatus}></i>)
}

export default EventoCheckbox