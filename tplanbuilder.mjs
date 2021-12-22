export {TPlanBuilder};



class TPlanBuilder {
  constructor(tplanconfig){
    this.tplanconfig = tplanconfig;

  }

  /**
   * Строит тестплан по переданной в конструкторе спецификации
   * @returns результирующий список кобинаций аспектов в плане
   * массив, каждый элемент (строка) которого - массив со списком объектов aspectgroup с отфильтрованными комбинациями допустимых конфигурацией значений
   */
  buildplan() {
    var result = [];

    // первый уровень
    var flnodes = this.tplanconfig.start.aspects;
    for (var i = 0; i < flnodes.length; i++){
      var nodeobj = flnodes[i];
      result[i] = [];
      result[i][0] = nodeobj;
    }
    return result;
  }

  /**
   * 
   */
  recurse(tpnode) {
    var result = [];

    for (var i = 0; i < tpnode. length; i++){
      var nodeobj = flnodes[i];
      result[i] = [];
      result[i][0] = nodeobj;
    }



  }

  /**
   * Определяет список допустимых комбинаций значений аспекта узла
   */
  restrictvalues(tpnode,parenttpnode) {
    var result = [];


    // пока делаем заглушку и возвращаем все комбинации


    return result;
  }

  /**
   * Возвращает список всех комбинаций значений аспектов узла
   * @param {*} tpnode 
   * @returns список комбинаций значений аспекта в виде усечённых объектов aspectgroup
   */
  combinevalues(tpnode, maxtuplesize = 1) {
    var result = [];

    // извлекаем список идентификаторов значений аспекта
    var aspectValuesIds = [tpnode.values.length];
    for (const value in tpnode.values) {
      aspectValuesIds.push(value.id)
    }





    return result;
  }


}

