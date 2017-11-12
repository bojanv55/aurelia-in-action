import java.util.Arrays;

/**
 * Created by default on 8.11.2017.
 */
public class Program {

  public static void main(String[] args) {
    System.out.println(Arrays.toString(getChange(5.0, 0.99)));
    System.out.println(Arrays.toString(getChange(3.14, 1.99)));
    System.out.println(Arrays.toString(getChange(4, 3.14)));
    System.out.println(Arrays.toString(getChange(0.45, 0.34)));
  }


  static int[] getChange(double M, double P){
    double[] ar = new double[]{0.01, 0.05, 0.10, 0.25, 0.5, 1};
    int[] timest = new int[6];

    double remains = M-P;
    int i = 5;
    while(remains > 0 && i>=0){
      if(remains-ar[i]>=0 || (remains-ar[i]>-0.001 && remains-ar[i]<0.001) ){
        remains-=ar[i];
        timest[i]++;
      }
      else{
        i--;
      }
    }

    return timest;
  }

}
