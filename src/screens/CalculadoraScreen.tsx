import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';
import {BotonCalc} from '../components/BotonCalc';

enum Operadores {
  sumar, restar, multiplicar, dividir
}

export const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const ultimaOperacion = useRef<Operadores>()

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    //no aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        //evaluar si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        //evaluar si es diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //evitar el 0000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }

    }else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };


  const btnDel = () => {
    if (numero.trim().length === 1) {
      setNumero('0')
    }else if(numero.includes('-') && numero.trim().length === 2){
      setNumero('0')
    }else {
      setNumero(numero.slice(0,-1))
    }
  }


  const cambiarNumPorAnterior = () => {
    if(numero.endsWith('.')){
      setNumeroAnterior(numero.slice(0,-1))
    }else{
      setNumeroAnterior(numero)
    }
    setNumero('0')
  }

  const btnDividir = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  }
  const btnMultiplicar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  }
  const btnRestar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  }
  const btnSumar = () => {
    cambiarNumPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  }

  const calcular = () => {

    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2}`);
        break
      case Operadores.restar:
        setNumero(`${num2 - num1}`);
        break
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break
      case Operadores.dividir:
        setNumero(`${num2 / num1}`);
        break
      }
      setNumeroAnterior('0');
  }

  return (
    <View style={styles.calculadoraContainer}>
      {
        (numeroAnterior !== '0') && <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      }
      <Text style={styles.calculadora} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      {/* fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="AC" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" accion={btnDel} />
        <BotonCalc texto="÷" color="#FF9427" accion={btnDividir} />
      </View>
      {/* fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero} />
        <BotonCalc texto="8" accion={armarNumero} />
        <BotonCalc texto="9" accion={armarNumero} />
        <BotonCalc texto="x" color="#FF9427" accion={btnMultiplicar} />
      </View>
      {/* fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero} />
        <BotonCalc texto="5" accion={armarNumero} />
        <BotonCalc texto="6" accion={armarNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={btnRestar} />
      </View>
      {/* fila de botones */}
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero} />
        <BotonCalc texto="2" accion={armarNumero} />
        <BotonCalc texto="3" accion={armarNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={btnSumar} />
      </View>
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armarNumero} />
        <BotonCalc texto="." accion={armarNumero} />
        <BotonCalc texto="=" accion={calcular} />
      </View>
    </View>
  );
};
