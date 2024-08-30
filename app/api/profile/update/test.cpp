#include <bits/stdc++.h>
using namespace std;
 
void solve(){
   int n,m;
   cin>>n>>m;
   int a[n];
   for(int i=0;i<n;i++) cin>>a[i];
   vector<int> v;
   int sum = 0;
   for(int i=0;i<n;i++){ sum+=a[i];}
   int k = sum/m;
   int leftValue = 0,extraValue=0;
   for(int i=0;i<n;i++){
    if(a[i]<m && leftValue==0){
        v.push_back(0);
    }else if(a[i]<m && leftValue!=0){
        if(leftValue>a[i]) v.push_back(0);
        else {
            v.push_back(1);
            extraValue = a[i]-leftValue;
        }

    }
   }
   for(auto it:v){
    cout<<it<<" ";
   }cout<<endl;
}
 
int main(){
    int tt=1;
    //cin>>tt;
    while(tt--) solve();
    return 0;
}